import { Provider } from "react-redux";
import thunk from "redux-thunk";
import ChatBox from "../../components/StreamingPage/ChatBox";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<ChatBox />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          userName: "mock name",
        },
      },
    });
    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <ChatBox />
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should chatting", () => {
    // const chattingInput = component.root.findByProps({ type: "text" });

    // renderer.act(() => {
    //   chattingInput.props.onChange({
    //     target: {
    //       value: "chatting",
    //     },
    //   });
    // });
    // expect(component.toJSON()).toMatchSnapshot();

    // renderer.act(() => {
    //   userThumnailButton.props.onClick({
    //     preventDefault: jest.fn(),
    //     isUpdateUserThumnail: store.dispatch(),
    //   });
    // });
    // expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
