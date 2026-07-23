import { useEffect, useState } from "react";

const useSchemaLoader = (fetchSchema) => {
    const [schema, setSchema] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await fetchSchema();
                setSchema(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [fetchSchema]);
    return {
        schema,
        loading,
        error,
    };
};

export default useSchemaLoader;