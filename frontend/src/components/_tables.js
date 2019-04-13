import React from 'react'
import { Table } from 'semantic-ui-react'
import { isArray } from 'util';

class Tables extends React.Component {

  componentDidMount(){

  }

  componentDidUpdate(){
    
  }

  render() {

    if (isArray(this.props.data)){
      return (
        <div>

          <div className="ui input">
            <input type="text" placeholder="Search..."></input>
          </div>

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
                    Object.values(entry).map((value, i) =>
                      <Table.Cell key={i}>{value}</Table.Cell>
                    )
                  }
                </Table.Row>
                )
              }
            </Table.Body>

            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>

        </div>
        
      );
    } else {
      return <p>Loading...</p>
    }

  }

}

export default Tables;
