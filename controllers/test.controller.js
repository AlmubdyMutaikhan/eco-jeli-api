const {c, cpp, node, python, java} = require('compile-run');

const compileJs = async (req, res) => {
    try {
        const code = req.body.code;
        if(!code){throw new Error("code doesn't exist!");}
        const sourcecode = code;
        const output = await node.runSource(sourcecode);
        res.send({output:output.stdout, err:output.stderr});
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
}

module.exports = {
    compileJs
}