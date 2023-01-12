import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
    const {workspace} = useContext(Context)
    const pageCount = Math.ceil(workspace.totalCount/workspace.limit)
    const pages = []

    for(let i = 0; i< pageCount; i++){
        pages.push(i+1)
    }

    return (
        <Pagination className='mt-5'>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={workspace.page === page}
                    onClick={() => workspace.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
})

export default Pages