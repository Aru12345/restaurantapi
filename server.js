import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import { data } from "./data.js";
// console.log(data);

const app = express();
const port = 4000;
//Data
const data = [
  {
    id: 1,
    category: "Appetizers",
    food: [
      {
        item: 1,
        name: "Iceberg Wedge Salad with House Cured Bacon – tomato salsa gorgonzola",
        price: 7.5,
      },
      {
        item: 2,
        name: "Sautéed Shredded Brussels Sprouts – bacon hazelnuts gorgonzola",
        price: 6.95,
      },
      {
        item: 3,
        name: "Kale Salad – parmesan crisp corn radish garlic-lemon vinaigrette",
        price: 7.5,
      },
      {
        item: 4,
        name: "Pecan Crusted Utah Goat Cheese with Basil-Mint Pesto - grilled tomato salsa crostini",
        price: 6.95,
      },
      {
        item: 5,
        name: "KChicken and Cabbage Eggrolls hot &amp; sour dipping sauce",
        price: 6.95,
      },
    ],
  },
  {
    id: 2,
    category: "Entress",
    food: [
      {
        item: 1,
        name: "Farfalle Pasta with Braised Pork in Tomato Cream – capers butternut squash kale",
        price: 12.95,
      },
      {
        item: 2,
        name: "Stout Braised Bratwusrt - horseradish mashed potatoes roasted root veggies grilled onion",
        price: 13.95,
      },
      {
        item: 3,
        name: "Salmon &amp; Crispy Tofu in Yellow Curry Sauce – vegetable sauté golden raisin chutney",
        price: 15.95,
      },
      {
        item: 4,
        name: "Sesame Shrimp – udon noodles ramen broth shiitake mushrooms bean sprouts scallions",
        price: 13.95,
      },
    ],
  },
  {
    id: 3,
    category: "Sandwiches",
    food: [
      {
        item: 1,
        name: "Served with choice of house pasta salad, green salad, or fresh fruit. For an additionalyou can “upgrade” (by substituting) to ½ pasta salad of the day, French onion soup or soup of the day.",
        price: 1.5,
      },
    ],
  },
  {
    id: 4,
    category: "Cold",
    choice:
      "Choice of sourdough, whole wheat, or rye bread half sandwich 7.95 , full sandwich 9.25",
    food: [
      {
        item: 1,
        name: "Turkey &amp; Avocado – with tomato",
      },
      {
        item: 2,
        name: "Pub Club – turkey, bacon. lettuce, tomato",
      },
      {
        item: 3,
        name: "Rare Roast Beef &amp; Swiss – sweet-hot mustard, lettuce, red onion",
      },
      {
        item: 4,
        name: "Veggie – pepper jack, avocado, sprout, tomato",
      },
    ],
  },
  {
    id: 5,
    category: "Hot",
    choice: "Choice of whole wheat or cheese &amp; onion bun",
    food: [
      {
        item: 1,
        name: "Southwest Chicken Breast Grilled Onion, Poblano Pepper, Tomato, Lettuce, Jack Cheese",
        price: 9.5,
      },
      {
        item: 2,
        name: "Portobello Fresh Mozzarella Caramelized Onion, Roasted Pepper, Tomato, Field Greens Basil Aioli",
        price: 9.5,
      },
      {
        item: 3,
        name: "Chipotle BBQ Pork Sandwich with Pickled Jalapeño Slaw",
        price: 9.5,
      },
      {
        item: 4,
        name: "Bacon Burger* Swiss, Lettuce, Tomato",
        price: 9.25,
      },
      {
        item: 5,
        name: "Mexi Burger* Pepper Relish, Pepper Jack, Tomato, Lettuce, Guacamole",
        price: 9.25,
      },
      {
        item: 6,
        name: "Herb Marinated Top Sirloin* Crimini Mushrooms, Caramelized Onion, Gorgonzola, Basil Aioli,Served Open Faced on Fococcia",
        price: 10.5,
      },
      {
        item: 7,
        name: "Roast Beef with Ancho Au Jus Jack Cheese, Grilled Onions, Served on Crumb Bros. Baguette",
        price: 9.75,
      },
      {
        item: 8,
        name: "Blackened Catfish Creole Peppers &amp; Onions, Fresh Herb Aioli, Served on house made Sourdough",
        price: 9.75,
      },
    ],
  },
  {
    id: 6,
    category: "Soups & salad combos",
    food: [
      {
        item: 1,
        name: "French Onion or Soup of the Day",
        price: 4.95,
      },
      {
        item: 2,
        name: "French Onion or Soup of the Day Combos with small green salad, fresh fruit or house pasta",
        price: 7.25,
      },
      {
        item: 3,
        name: "French Onion or Soup of the Day Combos with half pasta of the day",
        price: 8.75,
      },
    ],
  },
  {
    id: 7,
    category: "Fajitas",
    food: [
      {
        item: 1,
        name: "Served with red rice, black beans, grilled tomato salad, choice of corn or flour tortillas Chicken Onions, Poblano and Bell Peppers, Guacamole, Two Salsa Sirloin Steak, Onions, Poblano and Bell Peppers, Carrots, Onion, Guacamole, Two Salsas",
        price: 10.95,
      },
    ],
  },
  {
    id: 8,
    category: "Tacos",
    choice:
      "Served with red rice, black beans, corn &amp; romaine salad, tortilla chips",
    food: [
      {
        item: 1,
        name: "Beer Battered Fish with Jalapeño Remoulade, Roasted Salsa, Cabbage",
        price: 9.95,
      },
      {
        item: 2,
        name: "Carne Asada (marinated sirloin) with Guacamole, Tomatillo Salsa",
        price: 9.95,
      },
      {
        item: 3,
        name: "Citrus Marinated Chicken with Guacamole, Tomatillo Salsa",
        price: 9.95,
      },
      {
        item: 4,
        name: "Grilled Veggie with Zucchini, Yellow Squash, Bell Peppers, Onion, Guacamole, Tomatillo Salsa",
        price: 9.95,
      },
    ],
  },
  {
    id: 8,
    category: "Enchiladas",
    choice:
      "With Southwestern Succotash, Black Beans with Chipotle Crema. Choice of Beef, Chicken, Cheese or Veggie",
    food: [
      {
        item: 1,
        name: "Uno",
        price: 8.55,
      },
      {
        item: 2,
        name: "Dos",
        price: 9.95,
      },
      {
        item: 3,
        name: "Tres",
        price: 11.5,
      },
      {
        item: 4,
        name: "Chili Relleno Stuffed with Jack Cheese &amp; Corn Glazed Yam, Chayote Squash Succotash, Red Chili Sauce",
        price: 9.95,
      },
      {
        item: 5,
        name: "Pepita Crusted Salmon with Chipotle Glaze – chevre whipped yams, jicama slaw, tomatillo sauce",
        price: 10.95,
      },
    ],
  },
  {
    id: 9,
    category: "Quiche",
    food: [
      {
        item: 1,
        name: "Bacon, Swiss, Mushroom, Zucchini and Mushroom Quiche Choice of Fresh Fruit or Green Salad",
        price: 8.95,
      },
    ],
  },
  {
    id: 10,
    category: "Green Salad",
    food: [
      {
        item: 1,
        name: "Grilled Red Trout Lentils, Tomatoes, Cukes, Green Beans, Red Bells, Almonds, Sundried Tomato Vinaigrette",
        price: 10.95,
      },
      {
        item: 2,
        name: "Smoked Turkey Cheese Tortellini, Bacon, Tomato, Cucumber, Egg, Black Bean-Corn Salsa,Avocado",
        price: 9.95,
      },
      {
        item: 3,
        name: "Asian Grilled Chicken Snow Peas, Carrot Slaw, Red Bells, Water Chestnut, Peanuts, Baby Corn, Cilantro, Cukes, Spicy Peanut Dressing",
        price: 10.5,
      },
      {
        item: 4,
        name: "Southwest Grilled Chicken Tomato, Guacamole, pepitas, Jicama, Corn &amp; Black Bean Salsa,Orange Wedges, Spicy Citrus Vinaigrette",
        price: 10.5,
      },
      {
        item: 5,
        name: "Mediterranean Italian Sausage, Artichoke Hearts, Green Beans, Roma Tomato, Kalamatas,Red Onion, Cucumber, Croutons, Parmesan, Fresh Mozzarella, Gorgonzola Vinaigrette",
        price: 9.95,
      },
      {
        item: 6,
        name: "Grilled Salmon Artichoke tapenade, shredded kale, corn, radish, parmesan crisps",
        price: 11.5,
      },
    ],
  },
];

//Schema
const typeDefs = `
type Menu {
    id: ID!
    category: String!
    food: [Food]
    choice: String
  }

  type Food {
    item: ID!
    name: String!
    price: Float
  }
  type Query {
    menu: [Menu]
  }
`;

const resolvers = {
  Query: {
    menu: () => data,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.get("/", (request, response) => {
  response.send("Welcome to your GraphQL API!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
