import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import headerImage from "../images/header.svg";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect } from "react";
import api from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { InfoTooltip } from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isSuccesPopupOpen, setIsSucessPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [userData, setUserData] = useState("");

  const [stateInfoToolTip, setStateInfoToolTip] = useState(true);

  const [token, setToken] = useState("");

  useEffect(() => {
    function tokenCheck() {
      setToken(localStorage.getItem("token"));
      if (token) {
        auth.getContent(token).then((res) => {
          setLoggedIn(true);
          setUserData(res.user.email);
        });
      }
    }
    tokenCheck();
  }, [token, userData, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(true);
      history.push("/");
    }
  }, [history, loggedIn]);

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  useEffect(() => {
    api.getCards().then((data) => {
      setCards(data);
    });
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name: name, link: link, owner: currentUser }).then((data) => {
      setCards([data, ...cards]);
    });
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSucessPopupOpen(false);
    setSelectedCard({});
  }

  function handleEditAvatarClick(evt) {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(evt) {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(evt) {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
    });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    api.updateProfilePhoto({ avatar: avatar }).then(() => closeAllPopups());
  }

  function handleCardDelete(cardID) {
    api.deleteCards(cardID).then(() => {
      api.getCards().then((data) => {
        setCards(data);
      });
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleLoggedOut() {
    setToken(localStorage.removeItem("token"));
    setLoggedIn(false);
  }

  function handleSuccessOrErrorInfo() {
    setIsSucessPopupOpen(true);
  }

  function handleStateErrorInfo() {
    setStateInfoToolTip(false);
  }
  function handleStateSuccessInfo() {
    setStateInfoToolTip(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          image={headerImage}
          email={loggedIn ? userData : ""}
          onClick={handleLoggedOut}
        />
        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            currentUser={currentUser}
          />
        </ProtectedRoute>

        <Switch>
          <Route path="/signin">
            <Login
              isLoggedIn={handleLoggedIn}
              onSuccesPopupOpen={handleSuccessOrErrorInfo}
              handleStateErrorInfo={handleStateErrorInfo}
              handleStateSuccessInfo={handleStateSuccessInfo}
            />
          </Route>
          <Route path="/signup">
            <Register
              onSuccesPopupOpen={handleSuccessOrErrorInfo}
              handleStateErrorInfo={handleStateErrorInfo}
              handleStateSuccessInfo={handleStateSuccessInfo}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={!!selectedCard._id}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isSuccesPopupOpen}
          handleStateInfo={stateInfoToolTip}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
