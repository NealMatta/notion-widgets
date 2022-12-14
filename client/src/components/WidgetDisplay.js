import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

function WidgetDisplay(props) {
    // const [backgroundColor, setBackgroundColor] = useState(null);
    // setBackgroundColor(props.data.backgroundColor);

    const backgroundColor = props.data.backgroundColor;
    const linkToWidget = document.location.href + props.data.link;
    const linkForLink = '/' + props.data.link;

    return (
        <Col>
            <Card className="mb-4 shadow-sm">
                <Card.Img
                    className="cardImage"
                    variant="top"
                    src={props.data.imageHeader}
                    style={{ background: backgroundColor }}
                />
                <Card.Body>
                    <Card.Title>{props.data.widgetName}</Card.Title>
                    <Card.Text>{props.data.description}</Card.Text>
                    <Row>
                        {props.data.live == 'TRUE' && (
                            <>
                                <Col>
                                    <Link role="button" to={linkForLink}>
                                        <Button>Modify</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                linkToWidget
                                            );
                                        }}
                                    >
                                        Copy Link
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default WidgetDisplay;
