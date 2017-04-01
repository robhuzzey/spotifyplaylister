import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
export default (props) => (
  <Grid>
    <Row>
      <Col xs={12} md={12}>
        <h2>{props.title}</h2>
        {React.Children.toArray(props.children)}
      </Col>
    </Row>
  </Grid>
)
