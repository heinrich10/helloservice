
class HelloController {

	hello(req, res) {
		res.json({
			hello: req.user.username,
		});
	}

}

module.exports = HelloController;
