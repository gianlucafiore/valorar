import mariadb from 'mariadb';
import config from '../config';


export default mariadb.createPool(config.dbConn);