import React from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

class Tables extends React.Component {
  componentDidMount(){

    const TableExamplePagination = () => (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>First</Label>
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
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
    )
  }

  render() {
    return (
      <div>
        <p>This is where the Table will go.</p>
        <table class="ui celled table"><thead class=""><tr class=""><th class="">Header</th><th class="">Header</th><th class="">Header</th></tr></thead><tbody class=""><tr class=""><td class=""><div class="ui ribbon label">First</div></td><td class="">Cell</td><td class="">Cell</td></tr><tr class=""><td class="">Cell</td><td class="">Cell</td><td class="">Cell</td></tr><tr class=""><td class="">Cell</td><td class="">Cell</td><td class="">Cell</td></tr></tbody><tfoot class=""><tr class=""><th colSpan="3" class=""><div class="ui pagination right floated menu"><a class="icon item"><i aria-hidden="true" class="chevron left icon"></i></a><a class="item">1</a><a class="item">2</a><a class="item">3</a><a class="item">4</a><a class="icon item"><i aria-hidden="true" class="chevron right icon"></i></a></div></th></tr></tfoot></table>
      </div>
    )
  }
}

export default Tables;
