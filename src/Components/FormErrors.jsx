import { useTranslation } from 'react-i18next'

function FormErrors({ errors }) {
    const { t } = useTranslation()

    return (
        <div data-cy={'form-errors'}>
            {errors &&
                errors.map((error, index) => {
                    const errorMessage = t(error.key, {
                        field: t(`propertyNames.${error.propertyName}`),
                        max: error.maxLength ?? error.maxValue,
                        min: error.minValue,
                    })
                    return (
                        <p key={index} className={'text-red-500'}>
                            {errorMessage}
                        </p>
                    )
                })}
        </div>
    )
}

export default FormErrors
