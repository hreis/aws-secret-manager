const knex = require('../database/mySqlConnection');

module.exports = {
    async getJobs(req, res) {

        // const results = await knex({ pro: 'TB_JOB_INFO2', de: 'TB_DESENV', pd: 'TB_JOB_INFO2_DESENV', pu: 'TB_JOB_USUARIO', us: 'TB_USUARIO' })

        const results = await knex('TB_JOB_INFO2')
            .select('TB_JOB_INFO2.ID_FLUXO as id',
                'TB_JOB_INFO2.nm_fluxo_ui as ui',
                'TB_JOB_INFO2.nm_fluxo as name',
                'TB_JOB_INFO2.es_ativo as ativo',
                'TB_DESENV.NM_DESENV as devName',
                'TB_USUARIO.NM_USUARIO as usrName',
                'TB_JOB_INFO2.TM_EXEC_MANUAL as manual')
            .leftJoin('TB_JOB_INFO_DESENV', 'TB_JOB_INFO2.ID_FLUXO', 'TB_JOB_INFO_DESENV.ID_FLUXO')
            .leftJoin('TB_DESENV', 'TB_JOB_INFO_DESENV.CGE_DESENV', 'TB_DESENV.CGE_DESENV')
            .leftJoin('TB_JOB_USUARIO', 'TB_JOB_INFO_DESENV.ID_FLUXO', 'TB_JOB_USUARIO.ID_FLUXO')
            .leftJoin('TB_USUARIO', 'TB_JOB_USUARIO.ID_USUARIO', 'TB_USUARIO.ID_USUARIO');

        return res.json(results);

    },

    async search(req, res) {

        const results = await knex('TB_JOB_INFO2')
            .select('TB_JOB_INFO2.ID_FLUXO as id',
                'TB_JOB_INFO2.nm_fluxo_ui as ui',
                'TB_JOB_INFO2.nm_fluxo as name',
                'TB_JOB_INFO2.es_ativo as ativo',
                'TB_DESENV.NM_DESENV as devName',
                'TB_USUARIO.NM_USUARIO as usrName',
                'TB_JOB_INFO2.TM_EXEC_MANUAL as manual')
            .leftJoin('TB_JOB_INFO_DESENV', 'TB_JOB_INFO2.ID_FLUXO', 'TB_JOB_INFO_DESENV.ID_FLUXO')
            .leftJoin('TB_DESENV', 'TB_JOB_INFO_DESENV.CGE_DESENV', 'TB_DESENV.CGE_DESENV')
            .leftJoin('TB_JOB_USUARIO', 'TB_JOB_INFO_DESENV.ID_FLUXO', 'TB_JOB_USUARIO.ID_FLUXO')
            .leftJoin('TB_USUARIO', 'TB_JOB_USUARIO.ID_USUARIO', 'TB_USUARIO.ID_USUARIO')
            .where('nm_fluxo_ui', 'like', `${req.body.ui}`);

        return res.json(results);

    },

    async getJobsException(req, res) {

        // const results = await knex({ pro: 'TB_JOB_INFO2', de: 'TB_DESENV', pd: 'TB_JOB_INFO2_DESENV', pu: 'TB_JOB_USUARIO', us: 'TB_USUARIO' })

        const results = await knex('TB_JOB_INFO2')
            .select()
            .distinct('process')
            .rightJoin('job', 'TB_JOB_INFO2.NM_FLUXO_UI', 'job.process')
            .whereNull('NM_FLUXO_UI')
            .orderBy(1);

        return res.json(results);

    },

    async getDevs(req, res) {

        // const results = await knex({ pro: 'TB_JOB_INFO2', de: 'TB_DESENV', pd: 'TB_JOB_INFO2_DESENV', pu: 'TB_JOB_USUARIO', us: 'TB_USUARIO' })

        const results = await knex('TB_DESENV')
            .select('*')
            .where('ES_ATIVO', '=', 's');

        return res.json(results);

    },

    async getUsers(req, res) {

        // const results = await knex({ pro: 'TB_JOB_INFO2', de: 'TB_DESENV', pd: 'TB_JOB_INFO2_DESENV', pu: 'TB_JOB_USUARIO', us: 'TB_USUARIO' })

        const results = await knex('TB_USUARIO')
            .select('*');

        return res.json(results);

    },

    async postJob(req, res) {

        try {

            const results = await knex('TB_JOB_INFO2')
            .insert({
                NM_FLUXO_UI: req.body.ui,
                NM_FLUXO:  req.body.name,
                ES_Ativo:  req.body.ativo,
                TM_EXEC_MANUAL:  req.body.manual
            });

            return res.json(results);
            
        } catch (error) {

            return res.json(error);
            
        }

    },

    async deleteJob(req, res) {

        let results = await knex('TB_JOB_INFO2')
        .where('id_fluxo', req.params.id)
        .del()

        return res.json(results);
    }

}


