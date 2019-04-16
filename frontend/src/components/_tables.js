import React from 'react'
import { Table } from 'semantic-ui-react'
import { isArray } from 'util';
import styled from "styled-components";


////////////////////////////
// Styling


const TableContainerHeader = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 10px;
`

const HighlightedText = styled.em`
  background-color: yellow;
`

////////////////

class Tables extends React.Component {

  state = {
    searchTerm: null
  }

  searchTable = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  highlightSearchTerm = (cellValue) => {
    
    let cellText = cellValue.toString();

    if (cellText.includes(this.state.searchTerm) && this.state.searchTerm !== ''){
      return <HighlightedText>{cellText}</HighlightedText>
    } else {
      return cellText
    }
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    
  }

  render() {

    if (isArray(this.props.data)){
      return (
        <div>
         
          <TableContainerHeader>
            <div className="ui input">
              <input type="text" placeholder="Search..." onChange={this.searchTable}></input>
            </div>
          </TableContainerHeader>
        

          <Table className="ui sortable celled table">
            <Table.Header>
              <Table.Row>
                {
                  Object.keys(this.props.data[0]).map((x, i) => 
                  <Table.HeaderCell key={i}>{x}</Table.HeaderCell>
                  )
                }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                (this.props.data).map((entry, i) =>
                <Table.Row key={i}>
                  {
                    Object.values(entry).map((value, i) => {
                      return <Table.Cell key={i}>{this.highlightSearchTerm(value)}</Table.Cell>
                    })
                  }
                </Table.Row>
                )
              }
            </Table.Body>
          </Table>

        </div>
        
      );
    } else {
      return <p>Loading...</p>
    }

  }

}

export default Tables;
