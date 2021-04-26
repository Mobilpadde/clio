const { rule, map, ignore } = require("bean-parser");
const types = require("../../types");
const { expressions, wrap, values } = require("../common");

module.exports = {
  // Fat arrow assignment
  ...map([...values, ...expressions], {
    ender: rule((lhs) => lhs, 0.5),
    fatArrow: wrap((lhs, rhs) => {
      return {
        type: "fatArrowOpen",
        arrow: rhs,
        value: types.checkLambda(lhs, lhs, true, true),
      };
    }, 0.31),
  }),
  fatArrowOpen: {
    ...map(
      ["symbol", "propertyAccess", "slice"],
      wrap((lhs, rhs) => {
        lhs.type = "arrowAssignment";
        lhs.name = rhs;
        return lhs;
      }, 0.31)
    ),
  },
  arrowAssignment: {
    ...ignore("lineBreak"),
    arrow: wrap((lhs) => {
      return {
        type: "pipeOpen",
        data: lhs,
      };
    }),
    ender: wrap((lhs) => lhs),
  },
};
