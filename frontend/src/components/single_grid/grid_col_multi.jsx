import React from 'react';
import GridItem from './grid_item'
import styles from './grid.module.css';

class GridColumn extends React.Component{
  constructor(props){
    super(props);
    if (!props.selected) {
      this.state = { selected: [] };
    } else {
      this.state = { selected: props.selected }
    }
  }
  
  handleSelect(note){
    // debugger
    if (this.state.selected.includes(note)){
        let temp = this.state.selected.filter(ele => note !== ele);
        // debugger
        this.setState({ selected: temp })
        this.props.handleUpdate(temp)
    } else {
        let selected = this.state.selected;
        selected.push(note)
        this.setState({ selected })
        this.props.handleClick(note)
        this.props.handleUpdate(this.state.selected)
    }
  }
  

  render() {
    const selected = this.state.selected;
    const colStyles = (this.props.idx === 0 || this.props.idx % 8 !== 0) ? styles.gridCol : [styles.gridCol, styles.eighth].join(" ")
    return (<div id={this.props.idx} className={colStyles}>
      {this.props.noteNames.map((note, idx) => (
        <GridItem
          key={idx}
          selected = {selected.includes(note)}
          handleSelect={()=>this.handleSelect(note, idx)}
          note={note}
          isLoaded={this.props.isLoaded}
          // updateLast = {this.props.updateLast}
        />
          ))}
          </div>
      
    )
    
  }
}

export default GridColumn;