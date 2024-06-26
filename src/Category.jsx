import { Link } from 'react-router-dom'

function Category({ category }) {
    return (
        <Link data-cy="category" to={`/categories/${category.id}`} className={'hover:underline w-full cursor-pointer hover:bg-gray-100 flex flex-col p-10 justify-center items-center border border-black rounded'}>
            <div>{category.name}</div>
            <div className={'w-24 flex justify-center'}>
                <div className={'scale-150 origin-top'} dangerouslySetInnerHTML={{ __html: category.icon }}></div>
            </div>
        </Link>
    )
}

export default Category
