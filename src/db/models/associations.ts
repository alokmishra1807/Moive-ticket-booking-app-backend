import Theatre from "./theatre";
import Screen from "./screen";
import Seat from "./seat";

export function initializeAssociations() {
  Theatre.hasMany(Screen, {
    foreignKey: "theatreId",
    as: "screens",
  });

  Screen.belongsTo(Theatre, {
    foreignKey: "theatreId",
    as: "theatre",
  });

  Screen.hasMany(Seat, {
    foreignKey: "screenId",
    as: "seats",
  });

  Seat.belongsTo(Screen, {
    foreignKey: "screenId",
    as: "screen",
  });
}