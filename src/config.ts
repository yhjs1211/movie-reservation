import dotenv from 'dotenv';

dotenv.config();

function getValue(key : string, defaultValue?:string):string {
    const value = process.env[key] || defaultValue;
  
    if (!value) {
      throw new Error("There is no value in Process variable");
    } else {
      return value;
    }
  }
  
  export const config = {
    db: {
      database: getValue("DB_DATABASE", ""),
      host: getValue("DB_HOST", ""),
      username: getValue("DB_USERNAME", ""),
      password: getValue("DB_PASSWORD", ""),
    },
    jwt: {
      SecretKey: getValue("JWT_SECRET_KEY","CS&NE0!@0xru3sx2R4LLuF$QXG6wm4NH"),
      ExpiresIn: getValue("JWT_EXPIRES_IN", "1h"),
    },
    server: {
      port: getValue("PORT", "8080"),
    },
    bcrypt: {
      salt: getValue("BCRYPT_SALT","10")
    }
  };