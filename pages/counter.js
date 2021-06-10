import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import {
  increaseCounter,
  decreaseCounter,
  resetCounter,
} from "../redux/actions/counter";

function Counter(props) {
  return (
    <>
      <Container className="text-center">
        <h1>Counter</h1>
        <hr />
        <h3>{props.counter.count}</h3>
        <Button variant="primary" onClick={props.decreaseCounter}>
          -
        </Button>
        <Button
          variant="secondary"
          className="mx-2"
          onClick={props.resetCounter}
        >
          RESET
        </Button>
        <Button variant="primary" onClick={props.increaseCounter}>
          +
        </Button>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = { increaseCounter, decreaseCounter, resetCounter };
// (null, mapDispatchToProps)
// (mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
