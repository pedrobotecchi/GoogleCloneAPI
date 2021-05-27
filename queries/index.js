const pool = require('../postgresqlConnection');
const { generateResults } = require('../helper/searchHelper');


const checkSearchInDB = (request, response) => {
    const searchString = request.params.search;
    console.log("searchString",searchString)
    pool.query('SELECT searchInfo from searchResult WHERE search = $1', [searchString], (error, results) => {
        if (error) {
            throw error;
        }
        response.send(results.rows);
        //response.status(200).json(results.rows);
    })
}

const saveSearchStringInDB = (request, response) => {
    const { search } = request.body
    pool.query('SELECT * from search WHERE search = $1', [search], (error, results) => {
        if (error) {
            throw error;
        }

        if(results.rows.length === 0) {
            pool.query('INSERT INTO search (search) VALUES ($1)', [search], (error, results) => {
                if (error) {
                    throw error;
                }
            })
            const generatedResults = generateResults(search);
            pool.query('INSERT INTO searchResult (search, searchInfo) VALUES ($1, $2)', [search, generatedResults], (error, results) => {
                if(error) {
                    throw error;
                }
            })
        }
        response.status(200).json(results.rows);
    })
}

module.exports = {
    checkSearchInDB,
    saveSearchStringInDB
}