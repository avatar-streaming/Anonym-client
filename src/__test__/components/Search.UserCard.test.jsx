import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UserCard from "../../components/Search/UserCard";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<UserCard />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;
  let context = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          userName: "mock name 1",
          thumnail: "mock thumnail 1",
          followers: ["mock user2, mock user3"],
          followings: [{
            "_id": 1,
            "_id": 2,
          }],
        },
      },
    });
    store.dispatch = jest.fn();

    context = {
      "_id": 1,
      thumnail: "mock thumnail",
      userName: "mock userName",
      followers: [
        "mock user1",
        "mock user2",
      ],
    };

    component = renderer.create(
      <Provider store={store}>
        <UserCard {...context} />
      </Provider>
    );
  });

  it("should render with given state from redux store and context", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
