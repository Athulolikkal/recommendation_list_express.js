export const favouritesSchema = `
    CREATE TABLE IF NOT EXISTS public.favourites (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        recommendation_ids BIGINT[] DEFAULT '{}',
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT favourites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
`;


export const recommendationsSchema = `
    CREATE TABLE IF NOT EXISTS public.recommendations (
        id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        title VARCHAR(255) NOT NULL,
        caption TEXT,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        CONSTRAINT recommendations_pkey PRIMARY KEY (id),
        CONSTRAINT recommendations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
    );
`;

export const usersSchema = `
    CREATE TABLE IF NOT EXISTS public.users (
        id BIGINT NOT NULL,
        fname VARCHAR(255) NOT NULL,
        sname VARCHAR(255) NOT NULL,
        profile_picture TEXT NOT NULL,
        bio TEXT,
        created_at TIMESTAMP NOT NULL,
        CONSTRAINT users_pkey PRIMARY KEY (id)
    );
`;

