const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://kirito:kirito237@agendanutritionnel.cmtqesy.mongodb.net/FoodAgenda",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
)
.then(() => console.log("connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));
