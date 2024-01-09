import React, { useEffect, useState } from "react";
import { Auth } from './Auth';
import { db, auth, storage } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Admin.css";
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


function Admin() {
  const gamesCollectionRef = collection(db, "Games");
  const teamCollectionRef = collection(db, "Team");

  //games
  const [gameList, setGameList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [gameFileUpload, setGameFileUpload] = useState(null);

  // File Upload state
  const [fileUpload, setFileUpload] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginHidden, setLoginHidden] = useState(false);
  const [editingGameId, setEditingGameId] = useState(null);
  

  const startEditing = (gameId) => {
    setEditingGameId(gameId);
  };

  const cancelEditing = () => {
    setEditingGameId(null);
  };

  const isEditing = (gameId) => {
    return gameId === editingGameId;
  };

  const updateField = (prevList, gameId, fieldName, value) => {
    return prevList.map((game) => (game.id === gameId ? { ...game, [fieldName]: value } : game));
  };
 
  useEffect(() => {
    getGameList();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoginHidden(true);
      } else {
        setAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const getGameList = async () => {
    try {
      const data = await getDocs(gamesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGameList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `game-images/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitGame = async () => {
    try {
      if (gameFileUpload) {
        // Upload the image before adding game data
        await uploadFile(gameFileUpload, 'game-images');
      }
  
      const gameData = {
        title: newTitle,
        author: newAuthor,
        excerpt: newExcerpt,
        content: newContent,
        status: newStatus,
        userId: auth?.currentUser?.uid,
        imageLink: gameFileUpload ? `game-images/${gameFileUpload.name}` : null,
      };
  
      const gameDocRef = await addDoc(gamesCollectionRef, gameData);
      const gameId = gameDocRef.id;
      await updateDoc(gameDocRef, { id: gameId });
  
      setNewTitle("");
      setNewAuthor("");
      setNewExcerpt("");
      setNewContent("");
      setNewStatus("");
      setGameFileUpload(null);
  
      getGameList();
  
      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  
const deleteGame = async (id) => {
  const gameDoc = doc(db, "Games", id);
  await deleteDoc(gameDoc);
  getGameList(); 
};

const updateGameStatus = async (id) => {
  try {
    const gameDoc = doc(db, "Games", id);
    await updateDoc(gameDoc, { status: gameList.find((game) => game.id === id).status });
    getGameList();
    setEditingGameId(null);
  } catch (err) {
    console.error(err);
  }
};

const updateGameField = async (id, field, value) => {
  try {
    const gameDoc = doc(db, "Games", id);
    const updateObject = { [field]: value };
    await updateDoc(gameDoc, updateObject);
    getGameList();
  } catch (err) {
    console.error(err);
  }
};

// Add these functions to your component
const updateTitle = (id, value) => updateGameField(id, 'title', value);
const updateAuthor = (id, value) => updateGameField(id, 'author', value);
const updateExcerpt = (id, value) => updateGameField(id, 'excerpt', value);
const updateContent = (id, value) => updateGameField(id, 'content', value);
const updateStatus = (id, value) => updateGameField(id, 'status', value);


  //team
  const [teamList, setTeamList] = useState([]);
  const [newTeamMemberName, setNewTeamMemberName] = useState("");
  const [newTeamMemberJobTitle, setNewTeamMemberJobTitle] = useState("");
  const [teamMemberFileUpload, setTeamMemberFileUpload] = useState(null);
  const [editingTeamMemberId, setEditingTeamMemberId] = useState(null);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to the Auth component after logout
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  const startEditingTeamMember = (id) => {
    setEditingTeamMemberId(id);
  };

  const cancelEditingTeamMember = () => {
    setEditingTeamMemberId(null);
  };

  const isEditingTeamMember = (id) => {
    return id === editingTeamMemberId;
  };

  const updateTeamMemberField = async (id, field, value) => {
    try {
      const teamMemberDoc = doc(db, "Team", id);
      const updateObject = { [field]: value };
      await updateDoc(teamMemberDoc, updateObject);
      getTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const getTeamList = async () => {
    try {
      const data = await getDocs(teamCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTeamList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTeamMember = async (id) => {
    const teamMemberDoc = doc(db, "Team", id);
    await deleteDoc(teamMemberDoc);
    getTeamList(); // Refresh the team member list after deletion
  };

  const uploadTeamMemberFile = async () => {
    if (!teamMemberFileUpload) return;
    const filesFolderRef = ref(storage, `team/${teamMemberFileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, teamMemberFileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitTeamMember = async () => {
    try {
      if (teamMemberFileUpload) {
        const fileRef = ref(storage, `team/${teamMemberFileUpload.name}`);
        await uploadBytes(fileRef, teamMemberFileUpload);
      }

      const teamMemberData = {
        name: newTeamMemberName,
        jobTitle: newTeamMemberJobTitle,
        userId: auth?.currentUser?.uid,
        imageLink: teamMemberFileUpload ? `team/${teamMemberFileUpload.name}` : null,
      };

      await addDoc(teamCollectionRef, teamMemberData);

      setNewTeamMemberName("");
      setNewTeamMemberJobTitle("");
      setTeamMemberFileUpload(null);

      getTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTeamMemberName = async (id, value) => {
    try {
      const teamMemberDoc = doc(db, "Team", id);
      const updateObject = { name: value };
      await updateDoc(teamMemberDoc, updateObject);
      getTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTeamMemberJobTitle = async (id, value) => {
    try {
      const teamMemberDoc = doc(db, "Team", id);
      const updateObject = { jobTitle: value };
      await updateDoc(teamMemberDoc, updateObject);
      getTeamList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTeamMember = async (id) => {
    try {
      setEditingTeamMemberId(null);
    } catch (err) {
      console.error(err);
    }
  };

 

  return (
    <div className="app auth-container">
      {loginHidden ? null : <Auth />}
      <div>
        
      </div>
      <Tabs>
        <TabList>
          <Tab >Upload</Tab>
          <Tab >Games</Tab>
          <Tab>Team Members</Tab>

          <button onClick={handleLogout} className="log-out">Logout</button>
          
        </TabList>
        <TabPanel>
        <div className="Games">
            <p>Games</p>
            <input placeholder="Title..." className="admin-input" onChange={(e) => setNewTitle(e.target.value)} />
            <input placeholder="Author..." className="admin-input" onChange={(e) => setNewAuthor(e.target.value)} />
            <input placeholder="Excerpt..." className="admin-input" onChange={(e) => setNewExcerpt(e.target.value)} />
            <textarea placeholder="Content..." className="admin-input" onChange={(e) => setNewContent(e.target.value)} />
            <input placeholder="Status..." className="admin-input" onChange={(e) => setNewStatus(e.target.value)} />
            <input type="file" className="admin-browse-button" onChange={(e) => setGameFileUpload(e.target.files[0])}/>
            <button className="admin-browse-button" onClick={onSubmitGame}>Submit</button>
          </div>
          <div>
            <p>Team Member</p>
            <input placeholder="Team Member Name..." className="admin-input" onChange={(e) => setNewTeamMemberName(e.target.value)} />
            <input placeholder="Job Title..." className="admin-input" onChange={(e) => setNewTeamMemberJobTitle(e.target.value)} />
            <input type="file" className="admin-browse-button" onChange={(e) => setTeamMemberFileUpload(e.target.files[0])} />
            <button className="admin-browse-button" onClick={onSubmitTeamMember}> Submit </button>
          </div>
          
         
          </TabPanel>

          <TabPanel>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Excerpt</th>
              <th>Content</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {gameList.map((game) => (
    <tr key={game.id}>
      <td>
        {isEditing(game.id) ? (
          <input
            value={game.title}
            onChange={(e) => updateTitle(game.id, e.target.value)}
          />
        ) : (
          game.title
        )}
      </td>
      <td>
        {isEditing(game.id) ? (
          <input
            value={game.author}
            onChange={(e) => updateAuthor(game.id, e.target.value)}
          />
        ) : (
          game.author
        )}
      </td>
      <td>
        {isEditing(game.id) ? (
          <input
            value={game.excerpt}
            onChange={(e) => updateExcerpt(game.id, e.target.value)}
          />
        ) : (
          game.excerpt
        )}
      </td>
      <td>
        {isEditing(game.id) ? (
          <textarea
            value={game.content}
            onChange={(e) => updateContent(game.id, e.target.value)}
          />
        ) : (
          game.content
        )}
      </td>
      <td>
        {isEditing(game.id) ? (
          <input
            value={game.status}
            onChange={(e) => updateStatus(game.id, e.target.value)}
          />
        ) : (
          game.status
        )}
      </td>
      <td>{game.imageLink && <img src={game.imageLink} alt="Game" />}</td>
      <td>
        {isEditing(game.id) ? (
          <>
            <button onClick={() => updateGameStatus(game.id)}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => startEditing(game.id)}>Edit</button>
            <button onClick={() => deleteGame(game.id)}>Delete</button>
           
          </>
        )}
      </td>
    </tr>
  ))}
          </tbody>
        </table>
      </div>
    </TabPanel>

    <TabPanel>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Job Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
                {teamList.map((teamMember) => (
                  <tr key={teamMember.id}>
                    <td>
                      {isEditingTeamMember(teamMember.id) ? (
                        <input
                          value={teamMember.name}
                          onChange={(e) => updateTeamMemberField(teamMember.id, 'name', e.target.value)}
                        />
                      ) : (
                        teamMember.name
                      )}
                    </td>
                    <td>
                      {isEditingTeamMember(teamMember.id) ? (
                        <input
                          value={teamMember.jobTitle}
                          onChange={(e) => updateTeamMemberField(teamMember.id, 'jobTitle', e.target.value)}
                        />
                      ) : (
                        teamMember.jobTitle
                      )}
                    </td>
                    <td>
                      {isEditingTeamMember(teamMember.id) ? (
                        <>
                          <button onClick={() => updateTeamMemberName(teamMember.id)}>Update Name</button>
                          <button onClick={() => updateTeamMemberJobTitle(teamMember.id)}>Update Job Title</button>
                          <button onClick={() => updateTeamMember(teamMember.id)}>Update</button>
                          <button onClick={() => cancelEditingTeamMember()}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => deleteTeamMember(teamMember.id)}>Delete</button>
                          <button onClick={() => startEditingTeamMember(teamMember.id)}>Edit</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
    </table>
  </div>
</TabPanel>
      </Tabs>
    </div>
  );
}

export default Admin;
