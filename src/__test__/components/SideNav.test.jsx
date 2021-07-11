import { Provider } from "react-redux";
import thunk from "redux-thunk";
import SideNav from "../../components/SideNav";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";

describe("<SideNav />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          "_id": 1,
          userName: "mock name 1",
          thumnail: "mock thumnail 1",
          followings: [
            {
              "_id": 2,
              userName: "mock name 2",
              thumnail: "mock thumnail 2",
            },
            {
              "_id": 3,
              userName: "mock name 3",
              thumnail: "mock thumnail 3",
            },
          ],
        },
      },
    });

    component = renderer.create(
      <Provider store={store}>
        <SideNav />
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
