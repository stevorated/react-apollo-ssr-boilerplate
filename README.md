REACT_REDUX_APOLLO_LOGIN_BOILERPLATE

THIS IS A SIMPLE REACT REDUX SERVER SIDE RENDERED APP WITH LOGIN SYSTEM, GRAPHQL APOLLO CLIENT AND SERVER BY STEVORATED (Shirel Garber)

This is an ongoing project that i hope will help someone overcome the problems i faced trying to put up an Universal React Aoo using graphQL and mongoDb for the backend

The React client renders two times with seperate webpack setups for each (once for server rendering and the other as usual, is for the client rendering). i tryed keeping the code as dry as posible but still had to make some comprimises about apollo client and store setup for simplicity sake, in the future it will be refactored

I use both apollo client and redux for the front end cache managment, a little overkill but my aim is to put out a truley scalable app (which it's isn't still but it's getting there). for now i use the apollo client to query the server while redux for now is the used for cache managment, apollo client's cache is used only for caching queriens and in the future for subscriptions.

Code is still under heavy contruction and would be refactored as i go.

Testing? also will be added in the near furture, in order to allow my self flexibilty to try stuff i had to give it up for now, but it will also come probably in the form of Jest and Enzyme very soon.

Due to the ongoing nature of this project, and due to it being a learning expirience for me, i stress u not to use this stack in production yet. though, I'm aiming on getting there in the near future, {what would still then user discretion would still (as always) advised.}

hope you'll try it out and report any bugs or suggestions u might have.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.