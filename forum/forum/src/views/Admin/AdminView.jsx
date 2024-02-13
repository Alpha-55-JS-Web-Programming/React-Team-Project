// import { useEffect, useState, useContext } from "react";
// import { AppContext } from "../../Context/AppContext";
// import Button from "../../components/Button/Button";
// import { db } from "../../config/firebase-config";
// import { get, query, ref, orderByChild, equalTo } from "firebase/database";
// import admin from 'firebase-admin';

// // Make sure serviceAccount is defined
// const serviceAccount = {
//     "type": "service_account",
//     "project_id": "health-wellness-project-90261",
//     "private_key_id": "efc9a960817d45c9b1c53e4a7d8ef52c56066106",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfu0cAYCSNHdmM\nchj+ILh1IcSsECNfHmzuzjKTqDC2zpmqKZud3urljqHGsIffZXwSXLbRiRGiSAWy\n745w4D22OYk6eWcfTUjj4EB5cbL3a7I6/Fb+usgdssm2/lpcyvQaWFSxm0u5PlyA\nMgnypUcqNzuNwz/6pYrZryPC8NdhYf73q1I6ZDYhhUxQU1/ec4guImJVXru50gWY\nVbYTX7YJAG/JgWU+4IUQ2+/+Otkt840WalNnQVO3DUNjxC3H/mFrYrhWiPO3cJmU\nXiqW7G4VPn9m0Dtvwq3IKPuUVJkq6AgucZGJw+FA/+6dBRu1VWmaVXeMb1Okk9Bs\nlbPZiqn3AgMBAAECggEAPLxRrZdhHpVsjKYv0aVwbf1mkoRaZscjZZRbD+EikMgz\nDsxeYyOJjrry0aF7MJsel77QNxFW9q1LGXRUZaAmZv0urGDQMMtKvXceHO96PPEi\n5qHflGFCSWSbpazGgEUdl0zh+1yQ6QGI26frN2vYCPnSd793ut8qUkZxoyS/yMOH\npQe519Wr5W6aL7dsHb1RD7Okjw08RA07K0F2eoiCPJnB9SLQ992ZRn+xiX4JypRO\nXZ1rVo4HlhuIYN39/SBiBnkCKFIn4E6xeruwLBlY0gFvKIjDxkyiHUv2bOSQ3k7i\n5uJwkIOilmTpyLC6DWWxNw1kMdUOIP5p2Hxg25OpLQKBgQDZmF8DvQwa7JUt+O3N\n0hn4AryMkdkX6+iMj6uyE3gjFr8TGHs5MTEh70+/4Q8Zqgf0ls/ha9nYj8kXKdFc\nCqelQSgip7HoUGYVqnP3aZRsjN/9wqN7UM9PH01YPGOaKhEdoqlLd6YOd/+F7R/N\nwrUSJtb08UVTEMUXroAFAwIBBQKBgQC77HJFpiYQUPaDJdk8oDyVuNCdqRTMDnPh\nNUitAIlYt6XAAKCcgX97f28Aczj6F1knTNny4j8u94FqdjJBzWGsnj4M70Owy1jB\n2yPzdJUN+ZNtLsue1zGz2t8k34U75KMl4rw788ct3wGrsoPnJh9twGHHawRHqAOj\n0oqOZrdfywKBgQCQlmssdMZCbcqDDdIW3fFbl5XqYk+7UYrpO95/Kei+iDLXYYEf\n88wOHJMFkWsTRqSapkvkImJTQNgCiEsRuhLEAJPG01+oWyQ6aVU9pe52YvXEDT3M\nh1n53XbrltUob6OH6bpM52h0XNByEar8ctEXCq/zew7xr0cIAXAX5HPEcQKBgA1k\nFeh8pG25Nze1NLurN2X723HAoKjBxuQfZeReC2t0+qyp3sgIOktUk1ZW35KCo2m3\ngjhaguIX5PLvJTmnJvSj+gv16L7qXpLByNgKUKzEQgsfsIbLEtGcIRaBjv7rleyX\nMY6cGm9cWsQfXmLURp0Nfmo1aAKrKEc+M31eOGbtAoGAMSHX+F6YIqAi0rnIwzuI\n/h+/aOPyKNkn5sl3b+W+bBBXurE1YrhyQNh2vDeu0xe3+RvvYAVZjuSeQ/CIZgHf\nA7G3xMQKBBvyY6+jxN1Gu+SIK8NFK3trPOJAVxuCBoxdhZ3qChs9EukXqUPQQUoM\nmbgF9tbJxgGohg0kv4yqBnY=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-nx0pz@health-wellness-project-90261.iam.gserviceaccount.com",
//     "client_id": "107911616794824845802",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nx0pz%40health-wellness-project-90261.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://health-wellness-project-90261-default-rtdb.europe-west1.firebasedatabase.app/"
// });

// export default function AdminView() {
//   const { user } = useContext(AppContext);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getAllUsers().then(users => setUsers(users));
//   }, []);

//   const ChangeRole = async (user_id_to_make_admin) => {
//     const adminDatabase = admin.database();
//     const userId = user_id_to_make_admin;
//     const userRef = adminDatabase.ref('users').child(userId);

//     try {
//       await userRef.update({ role: 'admin' });
//       console.log('User role updated successfully.');
//     } catch (error) {
//       console.error('Error updating user role:', error);
//     }
//   }

//   const getAllUsers = async (search) => {
//     const snapshot = await get(query(ref(db, 'users')));
//     if (!snapshot.exists()) {
//       return [];
//     }

//     const users = Object.keys(snapshot.val()).map(key => ({
//       id: key,
//       ...snapshot.val()[key],
//       role: '', //? Am I supposed to get the role like tha?
//     })).filter(t => t.id.toLowerCase().includes(search.toLowerCase()));

//     console.log(users);
//     return users;
//   };

//   const listAllUsers = async () => {
//     try {
//       const listUsers = await getAllUsers();
//       return listUsers.map(userRecord => (
//         <div key={userRecord.id}>
//           <span>User: {userRecord.handle}</span>
//           <span>UserId: {userRecord.uid}</span>
//           <span>Role: {userRecord.role}</span>
//           <Button onClick={() => ChangeRole(userRecord.uid)}>Make Admin</Button>
//         </div>
//       ));
//     } catch (error) {
//       console.error('Error listing users:', error);
//       return null;
//     }
//   }

//   return (
//     <div>
//       <Button onClick={listAllUsers}>List Users</Button>
//       {users.length > 0 && users.map(user => (
//         <div key={user.id}>
//           <span>User: {user.handle}</span>
//           <span>UserId: {user.uid}</span>
//           <span>Role: {user.role}</span>
//         </div>
//       ))}
//     </div>
//   )
// }
