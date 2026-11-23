import React, { Component } from 'react';
import axios from 'axios';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';

class PersonList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`)
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="p-3">
        {this.state.persons.map(person => {
          const { name, login, location, dob, registered } = person;
          const address = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country} - ${location.postcode}`;

          const fields = [
            ['User Name', login.username],
            ['Gender', person.gender.toUpperCase()],
            ['Time Zone Description', location.timezone.description],
            ['Address', address],
            ['Email', person.email],
            ['Birth Date and Age', `${dob.date} (${dob.age})`],
            ['Register Date', registered.date],
            ['Phone#', person.phone],
            ['Cell#', person.cell]
          ];

          return (
            <Card key={login.uuid} bg="info" className="mb-3">
              <Card.Header className="fw-bold">
                {name.title} {name.first} {name.last} - {login.uuid}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={2} className="text-center">
                    <Image src={person.picture.large} roundedCircle fluid />
                    <Button variant="primary" className="mt-3">Details</Button>
                  </Col>
                  <Col md={10}>
                    {fields.map(([label, value]) => (
                      <Row key={label} className="mb-2">
                        <Col xs={3} className="text-end">{label}:</Col>
                        <Col xs={9}>{value}</Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default PersonList;