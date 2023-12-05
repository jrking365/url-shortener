import config from 'config';

import { Pool, QueryConfig} from 'pg';

let db: Pool | null = null;

function intialize():void {
    if (db == null) {
        if (!config.database.host) throw new Error('Database host is not defined');

        db = new Pool({
            host: config.database.host,
            port: config.database.port,
            user: config.database.username,
            password: config.database.password,
            database: config.database.database,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }
}

// export function asInsertKeys<InsertionDTO = any>(body: InsertionDTO) {
//     const keys = [];
//     const values = [];
  
//     if (Object.keys(body!).length <= 0) throw new Error('Empty objects are invalid');
  
//     for (const key in body) {
//       if (!body!.hasOwnProperty(key) || body[key] === null) continue;
  
//       if (typeof body[key] === 'object' && !Array.isArray(body[key])) throw new Error(`${key}: No objects accepted in body values`);
//       if (typeof body[key] === 'function') throw new Error(`${key}: No functions accepted in body values`);
//       if (typeof body[key] === 'number' && Number.isNaN(body[key])) throw new Error(`${key}: NaN is not accepted in body values`);
//       if (typeof body[key] === 'undefined') throw new Error(`${key}: undefined is not accepted in body values`);
  
//       keys.push(key);
//       values.push(Array.isArray(body[key]) ? `'{${body[key]}}'` : `'${body[key]}'`);
//     }
  
//     return `(${keys.join(',')}) VALUES (${values.join(',')})`;
//   }

export function rawQuery<ResultType>(sqlStatement: string | QueryConfig ): Promise<ResultType> {
    intialize();
    return new Promise((resolve, reject) => {
        db!.query(sqlStatement, (err:Error, elements) => {
            if (err) return reject(err);

            return resolve(elements as unknown as ResultType);
        }
    )
    });
}

// export function insert<InsertDTO = any>( tableName: string, insertDTO: InsertDTO): Promise<InsertDTO> {
//     intialize();
//     return rawQuery<>
// }