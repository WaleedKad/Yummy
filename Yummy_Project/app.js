const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();


const app = express();
const User = require('./model/user');
const Restaurant = require('./model/resturant');
const Cart = require('./model/cart');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');


const restaurants = [
  {
    img: "images/kfc.png",
    alt: "KFC",
    name: "KFC",
    cuisine: "Burgers",


  },
  {
    img: "images/daves.png",
    alt: "Dave's hot chicken",
    name: "Dave's hot chicken",
    cuisine: "Burgers",


  },
  {
    img: "images/mamanora.png",
    alt: "ماما نوره",
    name: "ماما نوره",
    cuisine: "MiddelEastren",


  },
  {
    img: "images/hardees.jpeg",
    alt: "Hardees",
    name: "Hardees",
    cuisine: "Burgers",


  },
  {
    img: "images/bk.png",
    alt: "Burger King",
    name: "Burger King",
    cuisine: "Burgers",


  },
  {
    img: "images/halfmillion.png",
    alt: "HalfMillion",
    name: "HalfMillion",
    cuisine: "Coffe",

  }

];

const promises = restaurants.map(restaurant => {
  return Restaurant.findOne({ name: restaurant.name })
    .then(existingRestaurant => {
      if (existingRestaurant) {
        console.log(`Restaurant '${restaurant.name}' already exists. Skipping...`);
        return null;
      } else {
        return Restaurant.create(restaurant)
          .then(savedRestaurant => {
            console.log(`Restaurant '${savedRestaurant.name}' saved successfully`);
            return savedRestaurant;
          });
      }
    })
    .catch(error => {
      console.error(`Error checking or saving restaurant '${restaurant.name}':`, error);
      return null;
    });
});

Promise.all(promises)
  .then(savedRestaurants => {
    console.log('All restaurants processed');
  })
  .catch(error => {
    console.error('Error processing restaurants:', error);
  });



//routes
app.get('/home', (request, response) => {
  Restaurant.find()
    .then(restaurants => {
      response.render('home', { restaurants });
    })
    .catch(error => {
      console.error('Error retrieving restaurants:', error);
      response.status(500).send('Error retrieving restaurants');
    });
});

app.get('/menu', (request, response) => {
  response.render('menu');
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.get('/register', (request, response) => {
  response.render('register', { message: 'User have been created', error: '' });
});

app.get('/cart', (req, res) => {
  Cart.find()
    .then(items => {
      res.render('cart', { items });
    })
    .catch(error => {
      console.error('Error retrieving cart items:', error);
      res.status(500).send('Error retrieving cart items');
    });
});

app.post('/add-to-cart', (req, res) => {
  const { product, price, quantity } = req.body;

  const total = price * quantity;

  const cartItem = new Cart({
    product,
    price,
    quantity,
    total
  });

  cartItem.save()
    .then(savedItem => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      res.status(500).send('Error adding item to cart');
    });
});

app.get('/contactus', (request, response) => {
  response.render('contactus');
});

app.get('/daves', (request, response) => {
  response.render('daves')
})

app.post('/register', (request, response) => {
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;
  const phoneNumber = request.body.phoneNumber;
  const address = request.body.address;
  const zipCode = request.body.zipCode;


  const newUser = new User({ firstName: firstName, lastName: lastName, email: email, password: password, phoneNumber: phoneNumber, address: address, zipCode: zipCode });
  newUser.save()
    .then(result => {
      response.redirect('/login');
      console.log(result)
    })
    .catch(error => {
      console.log(`Could not store user into database ${error}`);
      response.render('/register', { message: '', error: 'Could not register!' });

    })

})




////////////////////////////Search crud///////////////////////////////


app.use((request, response) => {
  response.status(404).send('<h1>Error404:Page is not found </h1>');
});

//connect to database and launch server

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to database...`);
    app.listen(process.env.PORT, () => {
      console.log(`server is listening to port ${process.env.PORT}`);
    })
  })
  .catch(error => {
    console.log(`Could not connect to database: ${error}`)
  });



