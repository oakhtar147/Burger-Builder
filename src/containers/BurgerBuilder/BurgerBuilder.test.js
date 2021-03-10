import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder getIngredients={() => {}} />);
  });

  it("should render <BuildControls /> if the ingredients are not null", () => {
    wrapper.setProps({ ingredients: { salad: 2 } }); // set random ingredients (not null)
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
