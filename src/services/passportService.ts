import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export function configurePassport() {
    const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID as string;
    const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET as string;

    const prisma = new PrismaClient();

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5432/auth/facebook/callback"
    },

    async function(accessToken, refreshToken, profile, done) {
        try {
            let user = await prisma.user.findUnique({
                where: { facebookId: profile.id }
            });

            if (!user) {
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : ""; 
                user = await prisma.user.create({
                    data: {
                        userName: profile.displayName,
                        facebookId: profile.id,
                        email
                    }
                });
            }

            done(null, user);
        } catch (error) {
            done(error);
        }
    }));
    passport.serializeUser((user:any, done) => {
      done(null, user.id);
  });


    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    return passport;
}