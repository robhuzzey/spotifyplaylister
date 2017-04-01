import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import LazyLoad from 'react-lazyload'
export default (props) => (
  <Grid>
    {React.Children.map(props.children, (child, i) => {
      return (
        <Row key={i}>
          <Col xs={12} md={12}>
            <LazyLoad height={100}>
              {child}
            </LazyLoad>
          </Col>
        </Row> 
      )
    })}
  </Grid>
)
