// import express from 'express';

// const routes = express.Router();

// routes.get(base, (req, res) => {
// 	getContent(db, {
// 		resource1: null,
// 		resource2: null,
// 		query: req.query
// 	}).then((value) => {
// 		if (value) {
// 			res.json(value);
// 			console.log('0');
// 		} else {
// 			res.send(`No value that matches query \n ${req.url}`);
// 		}
// 	});
// });

// routes.get(base + ':resource1', (req, res) => {
// 	getContent(db, {
// 		resource1: req.params.resource1,
// 		resource2: null,
// 		query: req.query
// 	}).then((value) => {
// 		if (value) {
// 			res.json(value);
// 			console.log('1');
// 		} else {
// 			res.send(`No value that matches query \n ${req.url}`);
// 		}
// 	});
// });

// routes.get(base + ':resource1/:resource2', (req, res) => {
// 	getContent(db, {
// 		resource1: req.params.resource1,
// 		resource2: req.params.resource2,
// 		query: req.query
// 	}).then((value) => {
// 		if (value) {
// 			res.json(value);
// 			// console.log(value);
// 		} else {
// 			res.send(`No value that matches query \n ${req.url}`);
// 		}
// 	});
// });

// export default routes;
