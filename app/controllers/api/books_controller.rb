class Api::BooksController < ApplicationController
  before_action :find_book, only: [ :show, :update, :destroy]
  respond_to :json

  def index
    respond_with current_user.books.order(created_at: :DESC)
  end

  def show
    respond_with @book
  end

  def create
    respond_with Book, json: current_user.books.create(book_params)
  end

  def destroy
    respond_with @book.destroy
  end

  def update
    respond_with Book, json: @book.update(book_params)
  end

  private

  def find_book
    @book ||= current_user.books.find(params[:id])
  end


  def book_params
    params.require(:book).permit(
      :id,
      :title,
      :description
    )
  end
end
