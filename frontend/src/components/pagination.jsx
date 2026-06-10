export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Prev</button>

            {pages.map(page => (
                <button key={page} onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                    {page}
                </button>
            ))}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
    );
}