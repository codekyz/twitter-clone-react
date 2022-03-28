import { useEffect, useState } from "react";
import Router from "./routes/Router";
import { authService } from "./fbase";
import Footer from "./components/Footer";

function App() {
  const auth = authService;
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            user.updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        user.updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <>
      {init ? (
        <Router
          isLoggedIn={Boolean(userObj)}
          refreshUser={refreshUser}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <Footer>&copy; {new Date().getFullYear()} codekyz</Footer>
    </>
  );
}

export default App;
