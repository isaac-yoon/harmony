import React from 'react';
import GridColumn from './grid_col';
import styles from './grid.module.css';
import * as Tone from 'tone';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillStopFill } from 'react-icons/bs';

export default class Grid extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null,
      playing: false,
      scheduleInterval: null,
      pauseSlide: false,
      pauseNote: 0,
      pauseInt: null,
    }
   
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRestart = this.handleRestart.bind(this)
    this.animateNote = this.animateNote.bind(this)

    this.pauseBtn = React.createRef()

    // this.noteNames = ["A1", "F#", "E", "C#", "B", "A2"];
    this.noteNames = ["A1", "B1", "C#2", "E2", "F#2", "A2"].reverse();
  }
  
  componentDidMount() {
    let arrBeats = [];
    for (let i = 0; i < this.props.beats; i++) {
      arrBeats.push("")
    }
    this.setState({ selected: arrBeats })
  }

  //handle update updates the state of the grid, taking in the number of the column,
  //and the selected index
  handleUpdate(column, index){
    debugger
    let arr = this.state.selected
    let note = this.noteNames[index]
    if(index !== -1){
      arr[column] = note;
      if (this.props.processNote) this.props.processNote(this.props.instrument,note,false, column)
    } else {
      arr[column] = ""
      if (this.props.processNote) this.props.processNote(this.props.instrument,note,true, column)
    };
    this.setState({selected: arr})
  }

  handleClick(note) {
    this.props.sampler.triggerAttack(note);
  }

  handleStart(loop) {
    this.setState({ startBtn: false })
      Tone.Transport.toggle();
      this.setState({ playing: !this.state.playing});
      let i = 0;
      const interval = Tone.Transport.scheduleRepeat(() => {
        this.animateNote(i)

        if (i === 0 ) {
          this.setState({ scheduleInterval: interval  });
        }
        if (this.state.selected[i]) {
          this.props.sampler.triggerAttackRelease(this.state.selected[i], "8n");
        }
        i += 1
        if (i === this.state.selected.length && !loop) {
          Tone.Transport.clear(interval);
          Tone.Transport.toggle();
          this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
        } else if (i === this.state.selected.length && loop) {
          i = 0

        }
      }, "8n");
    
  }

  animateNote(i) {
    document.getElementById(`${i}`).style.opacity = ".7"
    let k = i
    const pauseInt = setTimeout(() => {
      document.getElementById(`${k}`).style.opacity = "1"
    }, 250)
    this.setState({ startSlide: true, pauseNote: i, pauseInt: pauseInt })
  }

  handlePause() {
  
    if (this.state.playing) {
      Tone.Transport.pause();
      clearTimeout(this.state.pauseInt)
      document.getElementById(`${this.state.pauseNote}`).style.opacity = ".7"
    } else {
      Tone.Transport.start();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
    }
    this.setState({playing: !this.state.playing });

  }

  handleRestart() {
    if (this.state.scheduleInterval || this.state.scheduleInterval === 0) {
      Tone.Transport.start();
      Tone.Transport.clear(this.state.scheduleInterval);
      Tone.Transport.toggle();
      document.getElementById(`${this.state.pauseNote}`).style.opacity = "1"
      this.setState({ playing: !this.state.playing, scheduleInterval: null, pauseNote: 0, pauseInt: null });   
     } 
  }


  updateLast() {
    let lastIdx = 0
    for (let i = this.state.selected.length-1; i>=0; i--) {
      if (this.state.selected[i] !== "") {
        lastIdx = i;
        break;
      }
    }
    this.setState( { last: lastIdx })
  }


  render(){

    if (!this.state.selected) return null;
    const beats = this.state.selected.map( (ele, colNumber) => 
      <GridColumn
          selected={ele}
          idx = {colNumber}
          key={colNumber}
          handleUpdate = {index => this.handleUpdate(colNumber, index)}
          noteNames={this.noteNames}
          handleClick={this.handleClick}
          isLoaded={this.props.isLoaded}
      />
    )

    const pauseBtn = !this.state.playing ? (
      <FaPlay 
        size={20}
      />
    ) : (
      <FaPause 
        size={20}
      />
    )
    return(

      <div className={(this.props.beats !== 8) ? styles.gridOuter : styles.gridEight}>
        <div className={styles.grid}>
          {beats}
        </div>
        <div className={styles.buttons}>
        {
          this.state.scheduleInterval === null ? (
            <button className={styles.button} onClick={() => this.handleStart(false)} disabled={!this.props.isLoaded}>
              <FaPlay 
                size={20}
              />
            </button>
          ) : (
            <button className={styles.button} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
              {pauseBtn}
            </button>
          )
        }
      {
        this.state.scheduleInterval === null ? (
            <button className={styles.button} onClick={() => this.handleStart(true)} disabled={!this.props.isLoaded}>
            Repeat
          </button>
          ) : (
            <button className={styles.button} ref={this.pauseBtn} disabled={!this.props.isLoaded} onClick={this.handlePause}>
            {pauseBtn}
          </button>
          )
        }
        <button className={styles.button} disabled={!this.props.isLoaded} onClick={this.handleRestart}>
          <BsFillStopFill
            size={30}
          />
        </button>
        </div>
      </div>
    )
  }

}


