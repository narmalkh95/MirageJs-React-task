import {Model, Server} from "miragejs";
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.REACT_APP_JWT_SECRET;
const localUsers = localStorage.getItem('users');
const initialUsers = localUsers ? JSON.parse(localUsers) : [];
const localProducts = localStorage.getItem('products');
const initialProductsArr = localProducts ? JSON.parse(localProducts) : [];

export function makeServer({environment = "development"} = {}) {
  return new Server({
    environment,

    models: {
      user: Model,
      product: Model
    },

    seeds(server) {
      initialUsers?.map(user => server.create("user", user));
      initialProductsArr?.map(product => server.create("product", product));
    },

    routes() {
      this.namespace = "api";

      this.post("/user", (schema, request) => {
        const user = request?.requestBody ? JSON.parse(request.requestBody) : {};
        const {fullName, password, email} = user;

        if (!fullName || !password || !email) {
          return {error: 'All fields required!'}
        }

        const existByCurrentEmail = schema.users.findBy({email: email});

        if (existByCurrentEmail) {
          return {error: 'This email is also used!'}
        }

        const jwtPassword = jwt.sign(password, jwtSecret);
        schema.db.users.insert({email, password: jwtPassword, fullName});

        localStorage.setItem('users', JSON.stringify(schema.users.all().models?.map(model => model.attrs)))
        return {success: true}
      })


      /*AUTHENTICATION START*/
      this.get('/user', (schema, request) => {
        const user = request?.queryParams || {};
        const {password, email, token} = user;
        if (token) {
          const loggedUser = schema.users.findBy({authToken: token});

          if (loggedUser) {
            const {email, id, fullName} = loggedUser.attrs;
            return {success: true, data: {id: Number(id), email, fullName}}
          }
        } else {
          if (!password || !email) {
            return {error: 'All fields required!'}
          }

          const registeredUser = schema.users.findBy({email});

          if (registeredUser) {
            const token = jwt.sign(password, jwtSecret);

            if (token === registeredUser.password) {
              const authToken = jwt.sign(new Date() + password, jwtSecret);

              registeredUser.update('authToken', authToken);

              localStorage.setItem('users', JSON.stringify(schema.users.all().models?.map(model => model.attrs)))

              return {success: true, data: {token: authToken, id: Number(registeredUser.id), email: registeredUser.email, fullName: registeredUser.fullName}}
            }
          }
        }

        return {error: 'Username or password are incorrect!'}
      })

      this.get('/user/logout', (schema, request) => {
        const authentication = request?.requestHeaders?.authentication || {};

        const userToLogout = schema.users.findBy({'authToken': authentication});

        if (userToLogout) {
          userToLogout.update('authToken', '');
          localStorage.setItem('users', JSON.stringify(schema.users.all().models?.map(model => model.attrs)))

          return {success: true}
        }

        return {error: true}
      });

      /*AUTHENTICATION END*/

      /* Products Start*/
      this.get('/products', (schema, request) => {
        const authentication = request?.requestHeaders?.authentication || {};
        const currentUser = schema.users.findBy({'authToken': authentication});

        if (currentUser) {
          const userId = request?.queryParams?.id;

          if (userId) {
            return {success: true, dataList: schema.products.where({ownerId: userId})?.models?.map(model => model.attrs)}
          } else {
            return {success: true, dataList: schema.products.all()?.models?.map(model => model.attrs)};
          }
        }

        return {error: true}
      });

      this.post('/products', (schema, request) => {
        const authentication = request?.requestHeaders?.authentication || {};
        const currentUser = schema.users.findBy({'authToken': authentication});

        if (currentUser) {
          const product = request?.requestBody ? JSON.parse(request.requestBody) : {};

          schema.db.products.insert({...product, ownerId: Number(currentUser.id)});

          localStorage.setItem('products', JSON.stringify(schema.products.all()?.models?.map(model => model.attrs)))
          return {success: true}
        }

        return {error: true}
      })
      /* Products End*/
    },
  })
}
