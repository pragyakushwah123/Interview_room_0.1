# import psycopg2
# import os

# # Database connection details from your Django settings
# DB_HOST = 'roundhouse.proxy.rlwy.net'
# DB_NAME = 'railway'
# DB_USER = 'postgres'
# DB_PASSWORD = 'iVPfKmxRBMVnWCNYlMcKAcNDJTGnxxWA'
# DB_PORT = '29672'
# TABLE_NAME = 'api_video'  # Replace with your actual table name

# def delete_table_data():
#     try:
#         # Connect to your PostgreSQL database
#         conn = psycopg2.connect(
#             host=DB_HOST,
#             database=DB_NAME,
#             user=DB_USER,
#             password=DB_PASSWORD,
#             port=DB_PORT
#         )
#         cur = conn.cursor()

#         # Execute the DELETE command
#         cur.execute(f"DELETE FROM {TABLE_NAME};")
#         # Alternatively, use TRUNCATE to reset the table
#         # cur.execute(f"TRUNCATE TABLE {TABLE_NAME};")

#         # Commit the changes
#         conn.commit()

#         print(f"All data from the table '{TABLE_NAME}' has been deleted.")

#         # Close the cursor and connection
#         cur.close()
#         conn.close()

#     except Exception as error:
#         print(f"Error: {error}")

# if __name__ == "__main__":
#     delete_table_data()



# First give table name And run this command when you want to delete any table data
# python delete_table_data.py
