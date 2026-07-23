import { useFormContext } from "react-hook-form";

const useLLMAutofill = () => {
    const { setValue } = useFormContext();
    const autofill = (data) => {

        Object.entries(data).forEach(([key, value]) => {

            setValue(key, value, {
                shouldValidate: true,
                shouldDirty: true,
                
            });
        });
    };
    return autofill;
};

export default useLLMAutofill;