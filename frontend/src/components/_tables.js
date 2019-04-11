import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { isArray } from 'util';

class Tables extends React.Component {

  state = {
  }

  testData = () => {
    console.log("Test Data ", this.props.data)
  }

  componentDidMount(){
    this.testData()
  }

  componentDidUpdate(){
    this.testData()
  }

  render() {

    if (isArray(this.props.data)){
      return (
        <Table celled>
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
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer>
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
          </Table.Footer>
        </Table>
      );
    } else {
      return <p>Loading...</p>
    }

  }

}

export default Tables;
