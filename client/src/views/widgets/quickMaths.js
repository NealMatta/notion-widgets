import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getCampScores, setCampScores } from '../../services/widgetsServices';
import HeaderComponent from '../../components/navigation/HeaderComponent';
function selectOperator() {
    const operator = ['+', '-', '*', '/'];
    const opSelector = operator[Math.floor(4 * Math.random())];
    return opSelector;
}

function randomNumber(maxVal) {
    return Math.floor(maxVal * Math.random());
}

var mathItUp = {
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    },
    '*': function (x, y) {
        return x * y;
    },
    '/': function (x, y) {
        return x / y;
    },
};

function nextQuestion() {
    // Select Operator
    const operator = selectOperator();
    // Choose next numbers
    let n1 = randomNumber(25);
    let n2 = randomNumber(25);

    if (operator === '/') {
        while (n1 % n2 !== 0 || n1 === 0 || n2 === 0 || n2 === 1 || n1 === n2) {
            n1 = randomNumber(50);
            n2 = randomNumber(10);
        }
    } else if (operator === '*') {
        n1 = randomNumber(10);
        n2 = randomNumber(10);
        while (n1 === 0 || n2 === 0 || n1 === 1 || n2 === 1) {
            n1 = randomNumber(10);
            n2 = randomNumber(10);
        }
    } else {
        // For addition and subtraction
        while (n1 < n2 || n1 === 0 || n2 === 0 || n1 === n2) {
            n1 = randomNumber(25);
            n2 = randomNumber(25);
        }
    }

    // Figure out answer
    const answer = mathItUp[operator](n1, n2);

    // Create question ...
    const questionString = n1 + operator + n2;

    // ... and display it in the question box
    return [answer, questionString];
}

function QuickMaths() {
    const [game, setGame] = useState(false);
    const [phase, setPhase] = useState('p1');
    // For Game
    const [team, setTeam] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [inputAnswer, setInputAnswer] = useState('');
    const [teamScore, setTeamScore] = useState(0);
    const [amountCorrect, setAmountCorrect] = useState(0);
    const amountCorrectRef = useRef(amountCorrect);
    amountCorrectRef.current = amountCorrect;

    const [question, setQuestion] = useState('');

    const handleTeamSelect = e => {
        e.preventDefault();
        setPhase('p2');
    };

    const startGame = e => {
        e.preventDefault();
        setPhase('p3');
        setGame(true);
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        // Track score properly
        setCorrectAnswer(answer);

        // Ending Game
        setTimeout(() => {
            endGame();
        }, 60000);
    };

    async function endGame() {
        setPhase('p4');
        // Need to update scores properly
        /*
            TeamOne = Kids & TeamTwo = Parents
            Grab Final Score using amountCorrect
            Use updateScores to push appropriate score to approriate team 
        */

        const finalScores = await getCampScores();
        setTeamScore(finalScores[0][team] + amountCorrectRef.current);
        const scoreOfSelectedTeam =
            finalScores[0][team] + amountCorrectRef.current;

        // Set new camp scores
        await setCampScores(team, scoreOfSelectedTeam);
    }

    const checkQuestion = () => {
        if (!correctAnswer) {
            return null;
        }
        if (inputAnswer == correctAnswer) {
            setAmountCorrect(amountCorrect + 1);
        }
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        setCorrectAnswer(answer);
        setInputAnswer('');
    };

    return (
        <>
            <HeaderComponent />
            <Container className="px-4">
                <h1>Quick Maths</h1>
                <Form>
                    <Row xs={1} md={2} className="justify-content-around">
                        <Col md={4}>
                            <h2>Create new Game</h2>

                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create Game
                            </Button>
                        </Col>
                        <hr className="my-3 d-block d-sm-none" />
                        <Col md={4}>
                            <h2>Join Game</h2>
                            <Form.Group
                                className="mb-3"
                                controlId="formJoinCode"
                            >
                                <Form.Label>Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter 4-Letter Code"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Join Game
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default QuickMaths;
