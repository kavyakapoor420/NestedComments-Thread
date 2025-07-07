import {Pool} from 'pg'
import {DATABASE_URL} from  '../config/index.ts'


export const pool=new Pool({
    connectionString:DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
})


export async function initilizeDatabase():Promise<void>{
    let client ;
    try{
        client=await pool.connect() 
        await client.query(`
                CREATE TABLE IF NOT EXISTS  users (
                id SERIAL PRIMARY KEY ,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL ,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                );

                CREATE TABLE IF NOT EXISTS  comments (
                    id SERIAL PRIMARY KEY ,
                    user_id INTEGER NOT NULL REFRENCES users(id) ON DELETE CASCADE ,
                    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE ,
                    content  TEXT NOT NULL ,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                    deleted_at TIMESTAMP WITH TIME ZONE ,
                    is_deleted BOOLEAN DEFAULT FALSE 
                ) ;

                CREATE TABLE IF NOT EXISTS  notifications  (
                    id SERIAL PRIMARY KEY ,
                    user_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE ,
                    comment_id INTEGER NOT NULL REFERENCES  comments(id) on DELETE CASCADE ,
                    reply_id  INTEGER NOT NULL REFRENCESE comments(id) ON DELETE CASCADE,
                    message TEXT NOT NULL ,
                    is_read BOOLEAN DEFAULT FALSE ,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
                ) ;

               CREATE INDEX IF NOT EXISTS idx_comments_user_id ON  comments(user_id) ;
               CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id) ;
               CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id) ;
               CREATE INDEX IF NOT EXISTS idx_notifications_comment_id ON notifications(comment_id) 

            `)

            console.log('database tabled intialized successfully') 
    }catch(err){
           console.error('error intializing in database',err) 
    }
    finally{
        if(client){
            client.release() 
        }
    }
}