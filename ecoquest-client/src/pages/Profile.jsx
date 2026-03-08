

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Cropper from "react-easy-crop";
// function Profile() {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const token = localStorage.getItem("token");

//   // ✅ FIXED useEffect (no direct external function call)
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await API.get("/user/profile", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setUser(res.data);
//         setName(res.data.name);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     if (token) {
//       loadProfile();
//     }
//   }, [token]);

//   // ✅ Updated handleUpdate
//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       if (image) formData.append("profilePic", image);

//       await API.put("/user/profile", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       // Refresh profile after update
//       const updated = await API.get("/user/profile", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setUser(updated.data);
//       setName(updated.data.name);
//       setEditMode(false);

//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="profile-container">
//       <h1>👤 My Profile</h1>

//       <div className="profile-card">
//         <img
//           src={
//             user.profilePic
//               ? `http://localhost:5000${user.profilePic}`
//               : "https://via.placeholder.com/120"
//           }
//           alt="Profile"
//           className="profile-image"
//         />

//         {editMode ? (
//           <>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             {/* <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//             /> */}
//             <input
//   type="file"
//   accept="image/*"
//   onChange={(e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   }}
// />
// {previewImage && (
//   <>
//     <div className="crop-container">
//       <Cropper
//         image={previewImage}
//         crop={crop}
//         zoom={zoom}
//         aspect={1}   // passport size
//         onCropChange={setCrop}
//         onZoomChange={setZoom}
//         onCropComplete={(c, p) => setCroppedAreaPixels(p)}
//       />
//     </div>

//     <input
//       type="range"
//       min={1}
//       max={3}
//       step={0.1}
//       value={zoom}
//       onChange={(e) => setZoom(e.target.value)}
//     />
//   </>
// )}

//             <button onClick={handleUpdate}>Save</button>
//             <button onClick={() => setEditMode(false)}>Cancel</button>
//           </>
//         ) : (
//           <>
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>

//             <button onClick={() => setEditMode(true)}>
//               Edit Profile ✏️
//             </button>
//           </>
//         )}

//         <div className="profile-stats">
//           <p>🏆 Level: {user.level}</p>
//           <p>⭐ Points: {user.totalPoints}</p>
//           <p>🎁 Rewards: {user.rewards?.length || 0}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import API from "../services/api";
import Cropper from "react-easy-crop";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const token = localStorage.getItem("token");

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };

    if (token) loadProfile();
  }, [token]);

  // Update profile
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      if (window.selectedImageFile) {
        formData.append("profilePic", window.selectedImageFile);
      }

      await API.put("/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      const updated = await API.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(updated.data);
      setEditMode(false);
      setPreviewImage(null);
      setZoom(1);

    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>👤 My Profile</h1>

      <div className="profile-card">
        <img
          src={
            user.profilePic
              ? `http://localhost:5000${user.profilePic}`
              : "https://via.placeholder.com/120"
          }
          alt="Profile"
          className="profile-image"
        />

        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                window.selectedImageFile = file;
                setPreviewImage(URL.createObjectURL(file));
              }}
            />

            {previewImage && (
              <>
                <div className="crop-container" style={{ height: 300 }}>
                  <Cropper
                    image={previewImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                  />
                </div>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
              </>
            )}

            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <button onClick={() => setEditMode(true)}>
              Edit Profile ✏️
            </button>
          </>
        )}

        <div className="profile-stats">
          <p>🏆 Level: {user.level}</p>
          <p>⭐ Points: {user.totalPoints}</p>
          <p>🎁 Rewards: {user.rewards?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
