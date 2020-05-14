import React from 'react';
import KeyboardGrid from '../single_grid/keyboard_grid'
// import PianoGrid from '../single_grid/piano_grid'
// import DrumGrid from '../single_grid/drum_grid'
// import BassGrid from '../single_grid/bass_grid'

import MiniGrid from '../single_grid/mini_grid_partial';
// import Room from '../room/room';
import RoomContainer from '../room/room_container';
import styles from './main.module.css'
import ChatRoom from '../chat/chat_room'
import socketIOClient from "socket.io-client";
import { Switch,Route } from 'react-router-dom';

class MainPage extends React.Component {
  socket = socketIOClient()
  render() {
    return (
      <div>

        {/* <Room
          allNotes={[
            [ 'A2', 'A1', 'A4', 'E4' ],
            [ 'F2', 'A4' ],
            [ 'C3', 'C1', 'B4', 'E4' ],
            [ 'B3', 'A4' ],
            [ 'A2', 'A1', 'E4' ],
            [ 'F2', 'A4' ],
            [ 'C3', 'C1', 'E4', 'B4' ],
            [ 'B3', 'B4', 'D4' ]
          ]
          }
          mainGridNotes={ ["","","C#2","B1","","","C#2","B1"] }
          instrument={"piano"}
        /> */}
        {/* <PianoGrid
          cols={ 8 }
        />
        <BassGrid
          cols={ 8 }
        />
        <DrumsGrid
          cols={ 8 }
        />
        <KeyboardGrid
          cols={ 8 }
        /> */}
        <ChatRoom socket = {this.socket}> </ChatRoom>


        <Switch>
          <Route path="/rooms/:roomName/:cols" component={(props) => < RoomContainer socket = {this.socket}  {...props}/>} />
          <Route path="/" component={() => <KeyboardGrid cols={8}/>} />
          {/* <Route to="/:roomName/:cols" render={() => <RoomContainer cols={}/>} /> */}
        </Switch>

        <div className={styles.miniGrids}>
          <MiniGrid cols={8} selected={["A2", "E2", "A1", "E2", "A1", "C#2", "A1", "E2"]}/>
          <MiniGrid cols={8} selected={["A2", "C#2", "A1", "C#2", "E2", "A1", "B1", "A1"]}/>
          <MiniGrid cols={8} selected={["A2", "A1", "B1", "C#2", "A2", "E2", "A1", "A1"]}/>
        </div>
        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}

export default MainPage;
