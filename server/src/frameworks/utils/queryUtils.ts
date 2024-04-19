export function generateBulkInsertQuery(tableName: string, data: any[]) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data must be a non-empty array');
    }

    const columns = Object.keys(data[0]);

    const placeholders = Array.from({ length: columns.length }, () => '?');
    const values = data.flatMap(row => columns.map(col => row[col]));

    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${data.map(() => `(${placeholders.join(', ')})`).join(', ')}`;

    return { query, values };
}
