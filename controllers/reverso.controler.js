const Reverso = require('reverso-api');
const reverso = new Reverso();

const getWord = async (req, res) => {
    try {
        const word = req.query.word;
        const data = await reverso.getContext(
            word,
            'english',
            'russian');

        res.status(200).send({examples:data.examples.slice(0, 10)});
    } catch(err) {
        console.log(err);
        res.status(400).send({err:err.message});
    }
}




module.exports = {
     getWord
}