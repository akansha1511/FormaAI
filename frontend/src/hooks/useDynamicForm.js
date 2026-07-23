import { useFormContext } from "react-hook-form";
const useConditionalLogic = (field) => {
    const { watch } = useFormContext();
    if (!field.dependsOn)
        return true;
    const value = watch(field.dependsOn.field);
    return value === field.dependsOn.value;
};

export default useConditionalLogic;