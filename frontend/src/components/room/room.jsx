import React from 'react';
import MasterGrid from './master_grid';
import * as Tone from 'tone';
import InstrumentSelect from './instrument_select';

// import MiniGrid from './mini_grid';

// bass
import bA1 from "../../notes/bass_a_pentatonic/A1.mp3";
import bB1 from "../../notes/bass_a_pentatonic/B1.mp3";
import bCs2 from "../../notes/bass_a_pentatonic/Cs2.mp3";
import bE2 from "../../notes/bass_a_pentatonic/E2.mp3";
import bFs2 from "../../notes/bass_a_pentatonic/Fs2.mp3";
import bA2 from "../../notes/bass_a_pentatonic/A2.mp3";
// piano
import pA1 from "../../notes/piano_a_pentatonic/A1.mp3";
import pB1 from "../../notes/piano_a_pentatonic/B1.mp3";
import pCs2 from "../../notes/piano_a_pentatonic/Cs2.mp3";
import pE2 from "../../notes/piano_a_pentatonic/E2.mp3";
import pFs2 from "../../notes/piano_a_pentatonic/Fs2.mp3";
import pA2 from "../../notes/piano_a_pentatonic/A2.mp3";
// keyboard
import kA1 from "../../notes/keyboard_a_pentatonic/A1.mp3";
import kB1 from "../../notes/keyboard_a_pentatonic/B1.mp3";
import kCs2 from "../../notes/keyboard_a_pentatonic/Cs2.mp3";
import kE2 from "../../notes/keyboard_a_pentatonic/E2.mp3";
import kFs2 from "../../notes/keyboard_a_pentatonic/Fs2.mp3";
import kA2 from "../../notes/keyboard_a_pentatonic/A2.mp3";
// drums
import dA1 from "../../notes/drums/kick.mp3";
import dB1 from "../../notes/drums/snare.mp3";
import dCs2 from "../../notes/drums/hh.mp3";
import dE2 from "../../notes/drums/hho.mp3";
import dFs2 from "../../notes/drums/agogoHigh.mp3";
import dA2 from "../../notes/drums/agogoLow.mp3";

// {
//     A1: bA1, B1: bB1, C1: bCs2, D1: bE2, E1: bFs2, F1: bA2, 
//     A2: pA1, B2: pB1, C2: pCs2, D2: pE2, E2: pFs2, F2: pA2,
//     A3: kA1, B3: kB1, C3: kCs2, D3: kE2, E3: kFs2, F3: kA2, 
//     A4: dA1, B4: dB1, C4: dCs2, D4: dE2, E4: dFs2, F4: dA2, 
// }

class Room extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            instrumentSelected: false,
            instrument: null
        }
        this.sampler = new Tone.Sampler(
            {
                A1: bA1, B1: bB1, C1: bCs2, D1: bE2, E1: bFs2, F1: bA2, 
                A2: pA1, B2: pB1, C2: pCs2, D2: pE2, E2: pFs2, F2: pA2,
                A3: kA1, B3: kB1, C3: kCs2, D3: kE2, E3: kFs2, F3: kA2, 
                A4: dA1, B4: dB1, C4: dCs2, D4: dE2, E4: dFs2, F4: dA2, 
            },
            {
              onload: () => {
                this.setState({ isLoaded: true });
              }
            }
          ).toMaster();
    }

    componentDidMount() {
        // debugger
        let cols = parseInt(this.props.match.params.cols);
        let notes = new Array(cols).fill("");
        let drumNotes = [];
        for (let i = 0; i < cols; i++) {
            drumNotes.push([])
        }
        let grids = {
            "piano": {
                notes,
                instrument: "piano",
                beats: cols
            },
            "keyboard": {
                notes,
                instrument: "keyboard",
                beats: cols
            },
            "bass": {
                notes,
                instrument: "bass",
                beats: cols
            },
            "drums": {
                notes: drumNotes,
                instrument: "drums",
                beats: cols
            }
        }
        this.props.receiveGrids(grids)
    }


    selectInstrument(instrument) {
        this.setState({
            instrumentSelected: true,
            instrument
        })
        let room = {
            name: this.props.match.params.roomName,
            cols: this.props.match.params.cols,
            instrumentNames: ["keyboard","piano","drums","bass"]
            // .filter((ele) => {
            //     return !this.props.availableInstruments.includes(ele)
            // })
        }
        this.props.receiveRoom(room)
    }

    render() {
        // debugger
        if (!this.state.isLoaded) return null;
        // if (!this.props.instrument) return null;
        // if (!this.props.mainGridNotes) return null;
        const masterGrid = this.state.instrumentSelected ? (
            <MasterGrid
                    socket = {this.props.socket}
                    mainGridNotes={this.props.mainGridNotes}
                    allNotes={this.props.allNotes}
                    sampler={this.sampler}
                    // instrument={this.props.instrument}
                    instrument={this.state.instrument}
                    isLoaded={this.state.isLoaded}
                />
        ) : (
            null
        )
        
        return(
            <div>
                <InstrumentSelect 
                    instruments={this.props.availableInstruments}
                    selectInstrument={(instrument) => this.selectInstrument(instrument)}
                />
                {masterGrid}
                {/* <MiniGrid 
                    // notes={this.props.grids[?]}
                />
                <MiniGrid />
                <MiniGrid /> */}
            </div>
        )
    }
};

export default Room;